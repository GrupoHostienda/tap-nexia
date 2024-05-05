<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Background;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
// Model 

class BackgroundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Backgrounds/index', [
            'backgrounds' => Background::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Background::create($request->all());

        return Redirect::back()->with([
            'message' => 'Example created successfully',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        return Background::all();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Background $background)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Background $background)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        Background::destroy($id);

        return Redirect::back()->with([
            'message' => 'Example deleted successfully',
            'buttons' => Background::all(),
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function deleteSelected(Request $request)
    {

        $exampleIds = collect($request->items)->pluck('id');
        Background::destroy($exampleIds);

        return Redirect::back()->with([
            'message' => 'Selected link types deleted successfully',
            'buttons' => Background::all(),
        ]);
    }
}
