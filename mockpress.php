<?php
/**
 * Mockpress - Server
 *
 * Wordpress Mockpres Plugin Indonesia
 *
 * @wordpress-plugin
 * Plugin Name:       Mockpress - Server
 * Plugin URI:        https://mockpress.id
 * Description:       Plugin untuk mengupload template elementor.
 * Version:           1.0.0
 * Author:            Mockpress
 * Author URI:        https://mockpress.id/
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 */

// If this file is accessed directory, then abort.
include_once('elementor-kit/elementor-kit.php' );
add_action('admin_menu', 'page_menu');

defined('MOCKPRESS_PATH') or define('MOCKPRESS_PATH', plugin_dir_path(__FILE__));
defined('MOCKPRESS_URL') or define('MOCKPRESS_URL', plugin_dir_url(__FILE__));

function page_menu()
{
	add_menu_page( 'Mockpress Server', 'Mockpress Server', 'manage_options', 'mockpress-server', 'page_content_menu','dashicons-cloud-upload',
		3 );
}

function page_content_menu(){
	
	?>
	<style>
		.box{
			background-color: #ffffff;
			width: 920px;
			padding: 50px;
			margin: 20px;
			border-style: dotted;
			border-color: #67e6dc;
			text-align: center;
		}
		h1{
			text-align: center;
			color: #67e6dc;
			font-family: "Arial", Helvetica, sans-serif;
		}
		h3{
			margin: 20px;
		}
		input[type=text]{
			width: 80%;
			padding: 6px 10px;
			margin: 20px;
			display: inline-block;
			border: 1px solid #ccc;
			border-radius: 2px;
			box-sizing: border-box;
		}
		input[type=submit] {
			width: 10%;
			background-color: #5352ed;
			color: white;
			padding: 10px 10px;
			margin: 20px;
			border: none;
			border-radius: 2px;
			cursor: pointer;
		}
		table, tbody, td{
			margin: 20px;
			background-color: #67e6dc;
			color: #1e272e;
			font-weight: bold;
		}
	</style>
	<form action="" method="post" enctype="multipart/form-data">
		<div class="box">
			<h1>Upload Json Elementor Disini</h1>
			<input type="file" name="file" required="">
		</div>
		<input type="text" name="nama_template" placeholder="Nama Template" autocomplete="off" required=""> <input type="submit" name="save" value="Upload">
	</form>
	<?php 
	// Fungsi Insert Data
	if(isset($_POST['save'])){
		global $wpdb;
		$table_name = $wpdb->prefix.'mockpress';

			// Fungsi Upload File
		if($_FILES['file']['name'] != ''){
			$uploadedfile = $_FILES['file'];
			$upload_overrides = array( 'test_form' => false );

			$movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
			if ( $movefile && ! isset( $movefile['error'] ) ) {
				$data_temp_array = array();
				$data_temp_array['nama_template'] = $_POST['nama_template'];
				$data_temp_array['file'] = $movefile['url'];

				$data_array = json_encode($data_temp_array);

				$wpdb->insert($table_name,
					array('file_json'=>$data_array,

				),
					array('%s'
				)
				);
				echo "<script>alert('Data Berhasil Disimpan!')</script>";
			} else {
				echo $movefile['error'];
				echo "<script>alert('Data Gagal Disimpan!')</script>";
			}
		}

	}
	?>

	<h3>TEMPLATE ELEMENTOR</h3>
	<form method="post" action="<?php echo admin_url('admin.php?page=mockpress-server'); ?>">
		<table width="95%">
			<?php
			global $wpdb;
			$table_name = $wpdb->prefix.'mockpress';
			
			//Fungsi Delete Data
			if (isset($_POST['hapus'])) {
				$wpdb->delete($table_name,
					array('id'=>$_POST['hapus'])
				);
				if ($table_name) {
					echo "<script>alert('Data Berhasil Dihapus!')</script>";
				}else{
					echo "<script>alert('Data Gagal Dihapus!')</script>";
				}
			} 
			$mockpress_results = $wpdb->get_results("SELECT * FROM $table_name");
			foreach($mockpress_results as $mockpress_row){
				$id = $mockpress_row->id;
				$json_file = json_decode($mockpress_row->file_json, true);
				$nama_template = $json_file['nama_template'];
				$file = $json_file['file'];
				?>
				<tbody>
					<tr>
						<td width="10%"><?php echo $id;?></td>
						<td width="40%"><?php echo $nama_template;?></td>
						<td width="40%"><?php echo $file;?></td>
						<td width="5%"><button name="hapus" value="<?php echo $id; ?>">Hapus</button></td>
					</tr>
				</tbody>
				<?php } ?>
			</table>
		</form>
		<?php
		
	}
	//Fungsi Extension File
	function cc_mime_types($mimes) {
		$mimes['json'] = 'application/json';
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
	add_filter('upload_mimes', 'cc_mime_types');

	//Fungsi Memanggil File
	if (!defined('ABSPATH')) {
		define('ABSPATH', dirname(__FILE__) . '/');

	}
	//Fungsi Memanggil File Database
	include_once ('database_file.php');

	register_activation_hook(__FILE__,'DB_query_table');