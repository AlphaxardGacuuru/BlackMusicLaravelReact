<?php

namespace App\Http\Controllers;

use App\Models\KaraokeLike;
use App\Http\Services\KaraokeLikeService;
use Illuminate\Http\Request;

class KaraokeLikeController extends Controller
{
    public function __construct(protected KaraokeLikeService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        [$saved, $message] = $this->service->store($request);

        return response([
            "message" => $message,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KaraokeLike  $karaokeLike
     * @return \Illuminate\Http\Response
     */
    public function show(KaraokeLike $karaokeLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KaraokeLike  $karaokeLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeLike $karaokeLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KaraokeLike  $karaokeLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(KaraokeLike $karaokeLike)
    {
        //
    }
}
