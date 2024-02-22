<script setup lang="ts">
import { Head, router, useForm } from "@inertiajs/vue3";
import { ref } from 'vue';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

// PrimeVue
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from 'primevue/api';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Editor from 'primevue/editor';


defineProps({
    products: {
        type: Array,
        required: true,
    },
})

const toast = useToast();
const dt = ref();
const productDialog = ref(false);
const isEditing = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({
    name: "",
    email: "",
    description: "",
});

const selectedProducts = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);

const openNew = () => {
    emptyProduct()
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const showProduct = (id) => {
    router.visit(`/examples/${id}`);
}
const saveProduct = () => {
    submitted.value = true;

    const form  = useForm({
        ...product.value,
    })

    if (isEditing.value) {
        updateProduct(form);
        return
    }

    form.post(`/examples`, {
        onSuccess: () => {
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            productDialog.value = false;
        },
        onError: (error) => {
            console.log(error);
        }
    })
};
const updateProduct = (form) => {
    submitted.value = true;

    form.post(`/examples/update`, {
        onSuccess: () => {
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            productDialog.value = false;
        },
        onError: (error) => {
            console.log(error);
        }
    })
};
const editProduct = (prod) => {
    productDialog.value = true;
    isEditing.value = true;
    product.value = {...prod};
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    deleteProductDialog.value = false;

    const form = useForm({})

    form.delete(`/examples/${product.value.id}`, {
        onSuccess: () => {
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        },
        onError: (error) => {
            console.log(error);
        },
        onFinish: () => {
            emptyProduct();
        }
    });
};

const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    deleteProductsDialog.value = false;

    const form  = useForm({
        products: selectedProducts.value
    })

    form.delete(`/examples/deleteSelected`, {
        onSuccess: () => {
            selectedProducts.value = null;
            toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        },
        onError: (error) => {
            console.log(error);
        }
    })
};

const emptyProduct = () => {
    product.value = {
        name: "",
        email: "",
        description: "",
    };
};

// const onUploadImage = async (event) => {
//     const file = event.files[0];
//     const reader = new FileReader();
//     let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

//     reader.readAsDataURL(blob);

//     reader.onloadend = function () {
//         product.value.image = event.files[0];
//     };
// };

</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <Toast/>
        <div class="py-12">
            <div class="mx-auto sm:px-6 lg:px-8">
                <div
                    class="bg-white p-5 overflow-hidden shadow-sm sm:rounded-lg"
                >
                    <h2 class="text-2xl font-bold mb-4">Examples</h2>

                    <div>
                        <div class="card">
                            <Toolbar class="mb-4">
                                <template #start>
                                    <Button label="Nuevo" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                                    <Button label="Borrar" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                                </template>

                                <template #end>
                                    <Button label="Exportar" icon="pi pi-upload" severity="help" @click="exportCSV"  />
                                </template>
                            </Toolbar>

                            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                                :paginator="true" :rows="10" :filters="filters"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} productos">
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-between">
                                        <h4 class="m-0">Examples</h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                                        </span>
                                    </div>
                                </template>

                                <Column selectionMode="multiple" style="width: 3rem" />

                                <!-- Columnas inicio -->

                                <Column field="id" header="ID" sortable />

                                <Column field="name" header="Name" />

                                <Column field="email" header="Email" />

                                <Column field="description" header="Description" />

                                <!-- Columnas Fin -->

                                <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-eye" outlined rounded severity="help" class="mr-2" @click="showProduct(slotProps.data.id)" />
                                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>

                        <Dialog v-model:visible="productDialog" :style="{width: '850px'}" header="Product Details" :modal="true" class="p-fluid">

                            <!-- <div class="field mb-3">
                                <label for="image">Imagen</label>
                                <FileUpload mode="basic" name="demo[]" accept="image/*" customUpload @uploader="onUploadImage" :auto="true" chooseLabel="Subir Imagen..." />
                            </div> -->

                            <div class="field mb-3">
                                <label for="name">Name</label>
                                <InputText id="name" v-model.trim="product.name" required="true" :class="{'p-invalid': submitted && !product.name}" />
                                <small class="p-error" v-if="submitted && !product.name">name is required.</small>
                            </div>

                            <div class="field mb-3">
                                <label for="email">Email</label>
                                <InputText id="email" v-model.trim="product.email" required="true" :class="{'p-invalid': submitted && !product.email}" />
                                <small class="p-error" v-if="submitted && !product.email">email is required.</small>
                            </div>

                            <div class="field mb-3">
                                <label for="description">Description</label>

                                <Editor id="description" v-model.trim="product.description" required="true" :class="{'p-invalid': submitted && !product.description}" editorStyle="height: 320px" />

                                <small class="p-error" v-if="submitted && !product.description">description is required.</small>
                            </div>

                            <template #footer>
                                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
                            </template>
                        </Dialog>

                        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                            </template>
                        </Dialog>

                        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="product">Are you sure you want to delete the selected products?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
                                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                            </template>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
