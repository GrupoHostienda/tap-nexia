<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\LinkType;
use App\Models\LinkSchema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class LinkSchemaController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('LinkSchemas/index', [
            'linkTypes' => LinkType::where('hasSchema',false)->get(),
            'linkSchemas' => LinkSchema::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $schema = LinkSchema::create($request->all());
        $schema->type->setSchema(true);
        

        return Redirect::back()->with([
            'message' => 'Example created successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(LinkSchema $linkType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LinkSchema $linkType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LinkSchema $linkType)
    {
        $element = LinkSchema::find($request->id);
        $element->update($request->all());

        return Redirect::back()->with([
            'message' => 'Example updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $schema = LinkSchema::find($id);
        $schema->type->setSchema(false);
        $schema->delete();

        return Redirect::back()->with([
            'message' => 'Example deleted successfully',
            'buttons' => LinkSchema::all(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteSelected(Request $request)
    {

        $exampleIds = collect($request->items)->pluck('id');
        LinkSchema::destroy($exampleIds);

        return Redirect::back()->with([
            'message' => 'Selected link types deleted successfully',
            'buttons' => LinkSchema::all(),
        ]);
    }
}
