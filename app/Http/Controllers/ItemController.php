<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\UserItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ItemController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Item/index', [
            'items' => $this->currentUser()->items,
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
        $user = $this->currentUser();

        $items = UserItem::make($request->all());
        
        $user->items()->save($items);

        return Redirect::back()->with([
            'message' => 'UserItem created successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserItem $example)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $example = UserItem::find($request->id);
        $example->update($request->all());

        return Redirect::back()->with([
            'message' => 'Item updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        UserItem::destroy($id);

        return Redirect::back()->with([
            'message' => 'Item deleted successfully',
            'buttons' => UserItem::all(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteSelected(Request $request)
    {

        $exampleIds = collect($request->products)->pluck('id');
        UserItem::destroy($exampleIds);

        return Redirect::back()->with([
            'message' => 'Selected items deleted successfully',
            'buttons' => UserItem::all(),
        ]);
    }
}
