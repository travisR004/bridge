class Partnership < ActiveRecord::Base
  belongs_to :user, foreign_key: :in_partner
  belongs_to :partner, foreign_key: :out_partner, class_name: "User"
  belongs_to :project
end
