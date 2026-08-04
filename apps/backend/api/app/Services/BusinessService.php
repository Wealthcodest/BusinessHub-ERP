<?php

namespace App\Services;

use App\Models\Business;

class BusinessService
{
    public function all()
    {
        return Business::latest()->get();
    }

    public function create(array $data)
    {
        return Business::create($data);
    }

    public function update(Business $business, array $data)
    {
        $business->update($data);

        return $business;
    }

    public function delete(Business $business)
    {
        return $business->delete();
    }
}
