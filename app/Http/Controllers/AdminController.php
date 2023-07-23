<?php

namespace App\Http\Controllers;

use App\Http\Services\AdminService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct(protected AdminService $service)
    {
		// 
	}

    /*
	* List All Aggregated Data */
	public function admin()
	{
		return $this->service->admin();
	}

    /*
	* List All Users */
	public function users()
	{
		return $this->service->users();
	}

    /*
	* List All Videos */
	public function videos()
	{
		return $this->service->videos();
	}

    /*
	* List All Audios */
	public function audios()
	{
		return $this->service->audios();
	}

    /*
	* List All Kopokopo Recipients */
	public function kopokopoRecipients()
	{
		return $this->service->kopokopoRecipients();
	}

    /*
	* List All Bought Song Payouts */
	public function songPayouts()
	{
		return $this->service->songPayouts();
	}
}
