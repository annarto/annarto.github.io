build:
	# stupid workaround because static does not overwrite generated index.html
	hugo && cp -rL static/* public
