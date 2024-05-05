<script setup lang="ts">
import { Head, router, useForm } from "@inertiajs/vue3";
import { ref } from 'vue';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

// PrimeVue
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FileUpload from 'primevue/fileupload';
import { FilterMatchMode } from 'primevue/api';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import ColorPicker from 'primevue/colorpicker';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Editor from 'primevue/editor';


defineProps({
    backgrounds: {
        type: Array,
        required: true,
    },
    plans: {
        type: Array,
        required: true,
    },
})

const toast = useToast();
const dt = ref();
const itemDialog = ref(false);
const isEditing = ref(false);
const deleteItemDialog = ref(false);
const deleteItemsDialog = ref(false);
const item = ref({
          name:'',
          plan:'',
          image:'',
});

const selectedItems = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);

const openNew = () => {
    emptyItem()
    submitted.value = false;
    itemDialog.value = true;
};
const hideDialog = () => {
    itemDialog.value = false;
    submitted.value = false;
};
const showItem = (id) => {
    router.visit(`/backgrounds/${id}`);
}
const saveItem = () => {
    submitted.value = true;

    if (
        !item.value.name &&
        !item.value.plan
    ) {
      return;
    }

    const form  = useForm({
        ...item.value,
    })

    if (isEditing.value) {
        updateItem(form);
        return
    }

    form.post(`/backgrounds`, {
        onSuccess: () => {
            toast.add({severity:'success', summary: 'Successful', detail: 'Background Created', life: 3000});
            itemDialog.value = false;
        },
        onError: (error) => {
            console.log(error);
        }
    })
};
const updateItem = (form) => {
    submitted.value = true;

    form.post(`/backgrounds/update`, {
        onSuccess: () => {
            toast.add({severity:'success', summary: 'Successful', detail: 'Background Updated', life: 3000});
            itemDialog.value = false;
        },
        onError: (error) => {
            console.log(error);
        }
    })
};
const editItem = (prod) => {
    itemDialog.value = true;
    isEditing.value = true;
    item.value = {...prod};
};
const confirmDeleteItem = (prod) => {
    item.value = prod;
    deleteItemDialog.value = true;
};
const deleteItem = () => {
    deleteItemDialog.value = false;

    const form = useForm({})
    console.log(item.value.id);

    form.delete(`/backgrounds/${item.value.id}`, {
        onSuccess: () => {
            toast.add({severity:'success', summary: 'Successful', detail: 'Background Deleted', life: 3000});
        },
        onError: (error) => {
            console.log(error);
        },
        onFinish: () => {
            emptyItem();
        }
    });
};

const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteItemsDialog.value = true;
};
const deleteSelectedItems = () => {
    deleteItemsDialog.value = false;

    const form  = useForm({
        items: selectedItems.value
    })

    console.log(form)
    form.delete(`/backgrounds/deleteSelected`, {
        onSuccess: () => {
            selectedItems.value = null;
            toast.add({severity:'success', summary: 'Successful', detail: 'Brackgrounds  Deleted', life: 3000});
        },
        onError: (error) => {
            console.log(error);
        }
    })
};

const emptyItem = () => {
    item.value = {
           name:'',
           plan:'',
           image:'',
    };
};

    const onUploadImage = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        user.cover = reader.result;

        console.log("EL COVER ES ", user.cover);
    };

};

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
                    <h2 class="text-2xl font-bold mb-4">Background</h2>

                    <div>
                        <div class="card">
                            <Toolbar class="mb-4">
                                <template #start>
                                    <Button label="Nuevo" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                                    <Button label="Borrar" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedItems || !selectedItems.length" />
                                </template>

                                <template #end>
                                    <Button label="Exportar" icon="pi pi-upload" severity="help" @click="exportCSV"  />
                                </template>
                            </Toolbar>

                            <DataTable ref="dt" :value="backgrounds" v-model:selection="selectedItems" dataKey="id"
                                :paginator="true" :rows="10" :filters="filters"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} itemos">
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-between">
                                        <h4 class="m-0">Brackgrounds</h4>
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

                                <Column field="plan" header="Plan" />

                                <Column field="image" header="Image" />


                                <!-- Columnas Fin -->

                                <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-eye" outlined rounded severity="help" class="mr-2" @click="showItem(slotProps.data.id)" />
                                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)" />
                                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>

                        <Dialog v-model:visible="itemDialog" :style="{width: '850px'}" header="Background details" :modal="true" class="p-fluid">

                            <!-- <div class="field mb-3">
                                <label for="image">Imagen</label>
                                <FileUpload mode="basic" name="demo[]" accept="image/*" customUpload @uploader="onUploadImage" :auto="true" chooseLabel="Subir Imagen..." />
                            </div> -->

                            <div class="field mb-3">
                                <label for="name">Name</label>
                                <InputText id="name" v-model.trim="item.name" required="true" :class="{'p-invalid': submitted && !item.name}" />
                                <small class="p-error" v-if="submitted && !item.name">Name is required.</small>
                            </div>

                            <div class="field mb-3">
                                <label for="plan">Plan</label>
                                <InputText id="plan" v-model.trim="item.plan" required="true" :class="{'p-invalid': submitted && !item.plan}" />
                                <small class="p-error" v-if="submitted && !item.plan">Plan is required.</small>
                            </div>

                            <div class="field mb-3">
                                <label for="plan">Image</label>
                                <FileUpload
                                    mode="basic"
                                    name="demo[]"
                                    accept="image/*"
                                    customUpload @uploader="onUploadImage"
                                    :auto="true"
                                    chooseLabel="Upload image..."
                                />
                                <small class="p-error" v-if="submitted && !item.image">Plan is required.</small>
                            </div>


                            <template #footer>
                                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                                <Button label="Save" icon="pi pi-check" text @click="saveItem" />
                            </template>
                        </Dialog>

                        <Dialog v-model:visible="deleteItemDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="item">Are you sure you want to delete <b>{{item.name}}</b>?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteItemDialog = false"/>
                                <Button label="Yes" icon="pi pi-check" text @click="deleteItem" />
                            </template>
                        </Dialog>

                        <Dialog v-model:visible="deleteItemsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="item">Are you sure you want to delete the selected link type?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteItemsDialog = false"/>
                                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedItems" />
                            </template>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
