<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<script type="text/html" id="tmpl-mockpress-template-library-categories">
<#
	if ( ! _.isEmpty( categories ) ) {
#>
<select class="mockpress-library-categories">
	<option value=""><?php esc_html_e( 'Show All', 'mockpress' ); ?></option>
	<# _.each( categories, function( title, slug ) { #>
	<option value="{{ title }}">{{ title }}</option>
	<# } ); #>
</select>
<#
	}
#>
</script>
