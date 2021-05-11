<?php
/* ------------------------- */
/* File Query Untuk Database */
/* ------------------------- */

function DB_query_table(){
	global $wpdb;
	$DB_table_name = $wpdb->prefix."mockpress";
	$DB_query = "CREATE TABLE $DB_table_name(
				id int(10) NOT NULL AUTO_INCREMENT,
				file_json text DEFAULT '',
				PRIMARY KEY(id)
				)";
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $DB_query );
}
