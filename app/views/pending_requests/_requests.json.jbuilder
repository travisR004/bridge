json.array! pending_requests do |pending_request|
	json.(pending_request, :id, :in_user_id, :out_user_id, :in_user_accepted, :out_user_accepted)
	json.in_user(pending_request.in_user)
	json.out_user(pending_request.out_user)
end