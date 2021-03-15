# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


start_uid = 198568238374
start_policy_no = 202176768468683567457
insurers = ["Ceylinco Insurance", "Union Assurance", "Allianz Insurance", "Softlogic Insurance", "AIA Insurance"]
insurance_types = ["Fire", "Motor"]


1000.times do |i|
  customer = Customer.create(uid: start_uid, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name)
  start_uid = start_uid + 345464565

  insurer = insurers.sample
  current_expiry = Faker::Date.between(from: "2020-08-01", to: "2021-12-31")
  policy = InsurancePolicy.create(policy_no: start_policy_no, insurer: insurer, value: rand(1000000..20000000).round(-1), insurance_type: insurance_types.sample, current_expiry: current_expiry, customer: customer )
  
  4.times do |j|
    Renewal.create(policy_no: start_policy_no, start_date: current_expiry, expiry_date: current_expiry + 1.year, insurance_policy: policy, insurer: insurer)
  end
  start_policy_no = start_policy_no + 399
end

# 50.times do |i|
#   insurer = insurers.sample
#   current_expiry = Faker::Date.between(from: "2020-08-01", to: "2021-12-31")
#   policy = InsurancePolicy.create(policy_no: start_policy_no, insurer: insurer, value: rand(1000000..20000000).round(-1), insurance_type: insurance_types.sample, current_expiry: current_expiry, customer_id: i )
  
#   4.times do |j|
#     Renewal.create(policy_no: start_policy_no, start_date: current_expiry, expiry_date: current_expiry + 1.year, insurance_policy_id: policy.id)
#   end
#   start_policy_no = start_policy_no + 399
# end

