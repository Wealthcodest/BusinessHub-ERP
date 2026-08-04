<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBusinessRequest;
use App\Http\Requests\UpdateBusinessRequest;
use App\Http\Resources\BusinessResource;
use App\Models\Business;
use App\Services\BusinessService;

class BusinessController extends Controller
{
    protected BusinessService $service;

    public function __construct(BusinessService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return BusinessResource::collection(
            $this->service->all()
        );
    }

    public function store(StoreBusinessRequest $request)
    {
        $business = $this->service->create(
            $request->validated()
        );

        return new BusinessResource($business);
    }

    public function show(Business $business)
    {
        return new BusinessResource($business);
    }

    public function update(
        UpdateBusinessRequest $request,
        Business $business
    ) {
        $business = $this->service->update(
            $business,
            $request->validated()
        );

        return new BusinessResource($business);
    }

    public function destroy(Business $business)
    {
        $this->service->delete($business);

        return response()->json([
            'message' => 'Business deleted successfully.'
        ]);
    }
}