class Api::RenewalsController < ApplicationController
  before_action :set_renewal, only: [:show, :update]
  protect_from_forgery with: :null_session
  def index
    @renewals = Renewal.all
    
    render json: RenewalSerializer.new(@renewals).serializable_hash
  end

  def create
    @renewal = Renewal.new(renewal_params)
    if @renewal.save
      render json: @renewal
    else
      render json: {error: @renewal.errors.messages}, status: 422
    end
  end

  def show
    render json: RenewalSerializer.new(@renewal).serializable_hash
  end

  def update
    if @renewal.update(renewal_params)
      render json: RenewalSerializer.new(@renewal).serializable_hash
    else
      render json: {error: @renewal.errors.messages}, status: 422
    end
  end

  def destroy
    @renewal = Renewal.find_by(id: params[:id])
    if @renewal
      @renewal.destroy
      head :no_content
    else
      render json: {error: "Record not found"}, status: 400
    end
  end

  private

  def set_renewal
    @renewal = Renewal.find(params[:id])
  end

  def renewal_params
    params.require(:renewal).permit(:policy_no, :insurer, :start_date, :expiry_date, :insurance_policy_id)
  end
end
