json.(@project, :id, :user_id, :description, :status, :public_description)
json.images @project.images do |image|
  json.(image, :id, :project_id)
  json.photo_url(image.photo.url(:thumb))
  json.photo_url_small((image.photo.url(:medium)))
end