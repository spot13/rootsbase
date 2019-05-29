<?php
/**
 * ThemeREX Framework: debug utilities (for internal use only!)
 *
 * @package	green
 * @since	green 1.0
 */

// Disable direct call
if ( ! defined( 'ABSPATH' ) ) { exit; }

global $GREEN_GLOBALS;
$GREEN_GLOBALS['debug_file_name'] = 'debug.log';
$GREEN_GLOBALS['max_dump_level'] = -1;

// Short analogs for debug functions
if (!function_exists('dcl')) {	function dcl($msg)	{ 	if (is_user_logged_in()) echo '<br>"' . esc_attr($msg) . '"<br>'; } }		// Console log - output any message on the screen
if (!function_exists('dco')) {	function dco(&$var)	{ 	if (is_user_logged_in()) green_debug_dump_screen($var); } }				// Console obj - output object structure on the screen
if (!function_exists('dcs')) {	function dcs($lvl=-1){ 	if (is_user_logged_in()) green_debug_calls_stack_screen($lvl); } }		// Console stack - output calls stack on the screen
if (!function_exists('dcw')) {	function dcw()		{	if (is_user_logged_in()) green_debug_dump_wp(); } }						// Console WP - output WP is_... states on the screen
if (!function_exists('dfl')) {	function dfl($var)	{	if (is_user_logged_in()) green_debug_trace_message($var); } }			// File log - output any message into file debug.log
if (!function_exists('dfo')) {	function dfo(&$var)	{ 	if (is_user_logged_in()) green_debug_dump_file($var); } }				// File obj - output object structure into file debug.log
if (!function_exists('dfs')) {	function dfs($lvl=-1){ 	if (is_user_logged_in()) green_debug_calls_stack_file($lvl); } }			// File stack - output calls stack into file debug.log

if (!function_exists('green_debug_set_max_dump_level')) {
	function green_debug_set_max_dump_level($lvl) {
		global $GREEN_GLOBALS;
		$GREEN_GLOBALS['max_dump_level'] = $lvl;
	}
}

if (!function_exists('green_debug_die_message')) {
	function green_debug_die_message($msg) {
		green_debug_trace_message($msg);
		die($msg);
	}
}

if (!function_exists('green_debug_trace_message')) {
	function green_debug_trace_message($msg) {
		global $GREEN_GLOBALS;
		green_fpc(get_stylesheet_directory().'/'.($GREEN_GLOBALS['debug_file_name']), date('d.m.Y H:i:s')." $msg\n", FILE_APPEND);
	}
}

if (!function_exists('green_debug_calls_stack_screen')) {
	function green_debug_calls_stack_screen($level=-1) {
		$s = debug_backtrace();
		array_shift($s);
		green_debug_dump_screen($s, $level);
	}
}

if (!function_exists('green_debug_calls_stack_file')) {
	function green_debug_calls_stack_file($level=-1) {
		$s = debug_backtrace();
		array_shift($s);
		green_debug_dump_file($s, $level);
	}
}

if (!function_exists('green_debug_dump_screen')) {
	function green_debug_dump_screen(&$var, $level=-1) {
		if ((is_array($var) || is_object($var)) && count($var))
			echo "<pre>\n".nl2br(green_debug_dump_var($var, 0, $level))."</pre>\n";
		else
			echo "<tt>".nl2br(green_debug_dump_var($var, 0, $level))."</tt>\n";
	}
}

if (!function_exists('green_debug_dump_file')) {
	function green_debug_dump_file(&$var, $level=-1) {
		green_debug_trace_message("\n\n".green_debug_dump_var($var, 0, $level));
	}
}

if (!function_exists('green_debug_dump_var')) {
	function green_debug_dump_var(&$var, $level=0, $max_level=-1)  {
		global $GREEN_GLOBALS;
		if ($max_level < 0) $max_level = $GREEN_GLOBALS['max_dump_level'];
		if (is_array($var)) $type="Array[".count($var)."]";
		else if (is_object($var)) $type="Object";
		else $type="";
		if ($type) {
			$rez = "$type\n";
			if ($max_level<0 || $level < $max_level) {
				for (Reset($var), $level++; list($k, $v)=each($var); ) {
					if (is_array($v) && $k==="GLOBALS") continue;
					for ($i=0; $i<$level*3; $i++) $rez .= " ";
					$rez .= $k.' => '. green_debug_dump_var($v, $level, $max_level);
				}
			}
		} else if (is_bool($var))
			$rez = ($var ? 'true' : 'false')."\n";
		else if (is_long($var) || is_float($var) || intval($var) != 0)
			$rez = $var."\n";
		else
			$rez = '"'.($var).'"'."\n";
		return $rez;
	}
}

if (!function_exists('green_debug_dump_wp')) {
	function green_debug_dump_wp($query=null) {
		global $wp_query;
		if (!$query) $query = $wp_query;
		echo "<tt>"
			."<br>admin=".is_admin()
			."<br>main_query=".is_main_query()."  query=".esc_attr($query->is_main_query())
			."<br>query->is_posts_page=".esc_attr($query->is_posts_page)
			."<br>home=".is_home()."  query=".esc_attr($query->is_home())
			."<br>fp=".is_front_page()."  query=".esc_attr($query->is_front_page())
			."<br>search=".is_search()."  query=".esc_attr($query->is_search())
			."<br>category=".is_category()."  query=".esc_attr($query->is_category())
			."<br>tag=".is_tag()."  query=".esc_attr($query->is_tag())
			."<br>archive=".is_archive()."  query=".esc_attr($query->is_archive())
			."<br>day=".is_day()."  query=".esc_attr($query->is_day())
			."<br>month=".is_month()."  query=".esc_attr($query->is_month())
			."<br>year=".is_year()."  query=".esc_attr($query->is_year())
			."<br>author=".is_author()."  query=".esc_attr($query->is_author())
			."<br>page=".is_page()."  query=".esc_attr($query->is_page())
			."<br>single=".is_single()."  query=".esc_attr($query->is_single())
			."<br>singular=".is_singular()."  query=".esc_attr($query->is_singular())
			."<br>attachment=".is_attachment()."  query=".esc_attr($query->is_attachment())
			."<br>WooCommerce=".function_exists('green_is_woocommerce_page') && green_is_woocommerce_page()
			."<br><br />"
			."</tt>";
	}
}
?>