<?php

namespace App\Http\Services;

use App\Models\Search;

class SearchService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Search::where('username', $this->username)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        $search = new Search;
        $search->username = auth('sanctum')->user()->username;
        $search->keyword = $request->input('keyword');
        $search->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Search  $search
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = Search::find($id)->delete();
		
		return [$deleted, "Search deleted"];
    }
}
