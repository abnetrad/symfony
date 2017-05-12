<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Advert;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class AdvertController extends Controller
{
    public function indexAction()
    {
      //   return new Response("Hello World !");
     return $this->render('AppBundle:Advert:index.html.twig', array('nom' => 'REAL MADRID VS JUVENTUS  :) ' ));
    }

}