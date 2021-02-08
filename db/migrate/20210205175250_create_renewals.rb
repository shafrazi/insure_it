class CreateRenewals < ActiveRecord::Migration[6.1]
  def change
    create_table :renewals do |t|
      t.string :policy_no
      t.date :start_date
      t.date :expiry_date
      t.references :insurance_policy, null: false, foreign_key: true

      t.timestamps
    end
  end
end
