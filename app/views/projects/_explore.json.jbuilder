json.array! projects do |project|
	json.(project, :id, :user_id, :title, :public_description)
	if project.images.length > 0
	  json.photo_url(project.images.first.photo.url(:medium))
	  json.photo_url_small((project.images.first.photo.url(:thumb)))
	end
end