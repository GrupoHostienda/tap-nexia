<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\LinkType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class LinkTypeController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('LinkTypes/index', [
            'linkTypes' => LinkType::all(),
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
        LinkType::create($request->all());

        return Redirect::back()->with([
            'message' => 'Example created successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(LinkType $linkType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LinkType $linkType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LinkType $linkType)
    {
        $element = LinkType::find($request->id);
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
        LinkType::destroy($id);

        return Redirect::back()->with([
            'message' => 'Example deleted successfully',
            'buttons' => LinkType::all(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteSelected(Request $request)
    {

        $exampleIds = collect($request->items)->pluck('id');
        LinkType::destroy($exampleIds);

        return Redirect::back()->with([
            'message' => 'Selected link types deleted successfully',
            'buttons' => LinkType::all(),
        ]);
    }
}
