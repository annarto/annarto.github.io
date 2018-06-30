build:
	# stupid workaround because static does not overwrite generated index.html
	hugo && cp -a static/* public
