<?php

    include_once('../../config/init.php');
    include_once($BASE_DIR .'database/project.php');

    if(!isset($_SESSION['username'])){
        header('Location: ../authentication/home.php');
        die();
    }

    $username = $_SESSION['username'];

    if(!project_allowed($username,$_GET['project_id'])){
       header('Location:../authentication/home.php');
	   die();
    }

    $smarty->display('common/header.tpl');
    include_once($BASE_DIR . 'pages/shared/shared_header.php');
    include_once($BASE_DIR . 'pages/shared/shared_leftsidebar.php');
    include_once($BASE_DIR . 'pages/shared/shared_rightsidebar.php');

    $project = project_get_id($_GET['project_id']);

    $allDocs = project_get_documents($project['id']);

    $links = array();
    $documents = array();

    foreach($allDocs as $document){
	if($document['type']=='Link')
		array_push($links, $document);
	else
		array_push($documents, $document);
    }

    if($project['start'] != null && $project['deadline'] != null) {
        $today = strtotime(date("Y-m-d"));
        $deadline_t = strtotime($project['deadline']);
        $start_t = strtotime($project['start']);
        $diff_total = $deadline_t - $start_t;
        $diff_parcial = $today - $start_t;

        if($diff_total == 0){
            $percent_complete = 0;
        } else {
            $percent_complete = ($diff_parcial / $diff_total) * 100;
        }
    }

    $smarty->assign('percent_complete',$percent_complete);
    $smarty->assign('project', $project);
    $smarty->assign('links', $links);
    $smarty->assign('documents', $documents);

    $smarty->display('project/projectBody.tpl');
    $smarty->display('common/footer.tpl');
?>
