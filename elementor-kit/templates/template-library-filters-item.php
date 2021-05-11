<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<script type="text/html" id="tmpl-mockpress-template-library-filters-item">
<label class="mockpress-template-library-filter-label">
	<input type="radio" value="{{ slug }}" <# if ( '' === slug ) { #> checked<# } #> name="mockpress-library-filter">
	<span>{{ title }}</span>
</label>
</script>
