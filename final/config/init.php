<?php
  session_set_cookie_params(3600, '/~lbaw1665');
  session_start();

  error_reporting(E_ERROR | E_WARNING);

  $BASE_DIR = '/opt/lbaw/lbaw1665/public_html/final/';
  $BASE_URL = '/~lbaw1665/final/';
  $ERROR_FILE = $BASE_DIR . '/tmp/error.log';
  
  $conn = new PDO('pgsql:host=dbm;dbname=lbaw1665', 'lbaw1665', 'im80re93'); 
  $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $conn->exec('SET SCHEMA \'final\''); 

  include_once($BASE_DIR . 'lib/smarty/Smarty.class.php');

  $smarty = new Smarty;
  $smarty->template_dir = $BASE_DIR . 'templates/';
  $smarty->compile_dir = $BASE_DIR . 'templates_c/';
  $smarty->assign('BASE_URL', $BASE_URL);

  $smarty->assign('ERROR_MESSAGES', $_SESSION['error_messages']);
  $smarty->assign('FIELD_ERRORS', $_SESSION['field_errors']);
  $smarty->assign('SUCCESS_MESSAGES', $_SESSION['success_messages']);
  $smarty->assign('FORM_VALUES', $_SESSION['form_values']);
  $smarty->assign('USERNAME', $_SESSION['username']);

  ini_set("error_log",$BASE_DIR . "/tmp/error.log");

  unset($_SESSION['success_messages']);
  unset($_SESSION['error_messages']);
  unset($_SESSION['field_errors']);
  unset($_SESSION['form_values']);
?>
