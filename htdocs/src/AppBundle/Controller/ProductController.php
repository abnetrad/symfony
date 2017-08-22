<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Product;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Form\ProductType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends Controller
{

    public function indexAction()
    {
        return $this->render('AppBundle:Advert:home.html.twig', array('nom' => 'BIENVENUE chez GEEKstore !!  ^^  '));
    }

    public function listAction()
    {
        //$logger = $this->container->get('logger');
        //$logger->info('Look! I just used a service');


        $products = $this->getDoctrine()->getRepository('AppBundle:Product')->findAll();

        return $this->render('AppBundle:Advert:list.html.twig', array(
            'products' => $products
        ));
    }

    public function editAction(Request $request, Product $product = null)
    {

        //si le produit est null on en crée un nouveau

        if ($product === null) {
            $product = new Product();
        }


        $form = $this->createForm(ProductType::class, $product);


        $form->handleRequest($request);


        if ($form->isSubmitted()) {
            // on récupère les données déja existants . unitil de le faire avant car on attend que ce soit submitted "ARTHUR"
            $product = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();

            return $this->redirect($this->generateUrl('product_list', array(
                'id' => $product->getId()
            )));
        }
        return $this->render('AppBundle:Advert:create.html.twig', array(
            'form' => $form->createView()
        ));
    }

    public function deleteAction($id)
    {

        $em = $this->getDoctrine()->getManager();

        $product = $em->getRepository('AppBundle:Product')->find($id);

        if (!$product) {
            return $this->redirectToRoute('product_list');
        }

        $em->remove($product);
        $em->flush();
        return new Response('Produit' . ' ' . $id . ' ' . 'supprimé!');

    }

    public function showAction($id)
    {
        $product = $this->getDoctrine()
            ->getRepository('AppBundle:Product')
            ->find($id);

        if (!$product) {
            throw $this->createNotFoundException('No product found for id' . ' ' . $id);
        }

        return $this->render('AppBundle:Advert:show.html.twig', array(
            'nom' => $product,
            'id' => $product->getId(),
            'prix' => $product->getPrice(),
            'description' => $product->getDescription()
        ));
    }

    public function newAction()
    {

        $messageGenerator = $this->container->get('app.message_generator');
        /*
        // or use this shorter syntax
                // $messageGenerator = $this->get('app.message_generator');
                $isLoggingEnabled = $this->container
                    ->getParameter('enable_generator_logging');
                */

        $message = $messageGenerator->getHappyMessage();
        $this->addFlash('success', $message);

        return new Response($message);

    }

    public function userAction()
    {
        return new Response('<html><body>User page!</body></html>');
    }


}