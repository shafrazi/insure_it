class RenewalSerializer
  include JSONAPI::Serializer
  attributes :policy_no, :start_date, :expiry_date, :insurance_policy_id, :insurance_policy
  belongs_to :insurance_policy
end
