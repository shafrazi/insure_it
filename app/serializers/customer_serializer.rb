class CustomerSerializer
  include JSONAPI::Serializer
  attributes :uid, :first_name, :last_name, :insurance_policies
  # has_many :insurance_policies
end
