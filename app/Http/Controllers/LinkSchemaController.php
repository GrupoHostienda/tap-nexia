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
        $linkSchemas = LinkSchema::with('type')->get()->groupBy(function ($item) {
            return $item->type->name;
        })->map(function ($group) {
            return $group->sortBy('name')->values()->toArray();
        });


        return Inertia::render('LinkSchemas/index', [
            'linkTypes' => LinkType::where('hasSchema',false)->get(),
            'linkTypesSchema' => LinkType::where('hasSchema',true)->get(),
            'linkSchemas' => LinkSchema::all()->load('type'),
            'linkSchemasGroupBy' => $linkSchemas,
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

        $link = LinkType::find($request->link_type_id);

        if ($link) {
            foreach ($request->schemas as $schemaData) {
                $schema = LinkSchema::make($schemaData);
                $link->schemas()->save($schema);
                $schema->type->setSchema(true);
            }
        }


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
        $link = LinkType::find($request->link_type_id);
        $link->schemas()->delete();

        if ($link) {
            foreach ($request->schemas as $schemaData) {
                $schema = LinkSchema::make($schemaData);
                $link->schemas()->save($schema);
            }
        }

        return Redirect::back()->with([
            'message' => 'Example updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        
        $schema = LinkType::find($id);
        $schema->setSchema(false);
        $schema->schemas()->delete();

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
        foreach($exampleIds as $id){
            $schema = LinkType::find($id);
            $schema->setSchema(false);
            $schema->schemas()->delete();
        }

        return Redirect::back()->with([
            'message' => 'Selected link types deleted successfully',
            'buttons' => LinkSchema::all(),
        ]);
    }
}
