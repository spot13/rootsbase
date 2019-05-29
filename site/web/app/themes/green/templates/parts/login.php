<div id="popup_login" class="popup_wrap popup_login bg_tint_light">
	<a href="#" class="popup_close"></a>
	<div class="form_wrap">
		<div class="form_left">
			<form action="<?php echo wp_login_url(); ?>" method="post" name="login_form" class="popup_form login_form">
				<input type="hidden" name="redirect_to" value="<?php echo esc_url( home_url( '/' ) ); ?>">
				<div class="popup_form_field login_field iconed_field icon-user-2"><input type="text" id="log" name="log" value="" placeholder="<?php esc_html_e('Login or Email', 'green'); ?>"></div>
				<div class="popup_form_field password_field iconed_field icon-lock-1"><input type="password" id="password" name="pwd" value="" placeholder="<?php esc_html_e('Password', 'green'); ?>"></div>
				<div class="popup_form_field remember_field">
					<a href="<?php echo wp_lostpassword_url( get_permalink() ); ?>" class="forgot_password"><?php esc_html_e('Forgot password?', 'green'); ?></a>
					<input type="checkbox" value="forever" id="rememberme" name="rememberme">
					<label for="rememberme"><?php esc_html_e('Remember me', 'green'); ?></label>
				</div>
				<div class="popup_form_field submit_field"><input type="submit" class="submit_button" value="<?php esc_html_e('Login', 'green'); ?>"></div>
			</form>
		</div>
		<div class="form_right">
			<div class="login_socials_title"><?php esc_html_e('You can login using your social profile', 'green'); ?></div>
			<div class="login_socials_list sc_socials sc_socials_size_tiny">
				<?php
				$list = array(
					array('icon' => green_get_socials_url('facebook'), 'url'	=> '#'),
					array('icon' => green_get_socials_url('twitter'), 'url'	=> '#'),
					array('icon' => green_get_socials_url('gplus'), 'url'	=> '#')
				);
				echo trim(green_prepare_socials($list));
				?>
			</div>
			<div class="login_socials_problem"><a href="#"><?php esc_html_e('Problem with login?', 'green'); ?></a></div>
			<div class="result message_block"></div>
		</div>
	</div>	<!-- /.login_wrap -->
</div>		<!-- /.popup_login -->
