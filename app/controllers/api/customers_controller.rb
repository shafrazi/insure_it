class Api::CustomersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @customers = Customer.all
    
    render json: CustomerSerializer.new(@customers, {fields: {customer: [:id, :first_name, :last_name, :uid]}}).serializable_hash
  end

  def create
    @customer = Customer.new(customer_params)
    if @customer.save
      render json: @customer
    else
      render json: {error: @customer.errors.messages}, status: 422
    end
  end

  def show
    @customer = Customer.find(params[:id])
    # options = {}
    # options[:include] = [:insurance_policies]
    render json: CustomerSerializer.new(@customer).serializable_hash
  end

  def update
    @customer = Customer.find(params[:id])
    if @customer.update(customer_params)
      render json: CustomerSerializer.new(@customer).serializable_hash
    else
      render json: {error: @customer.errors.messages}, status: 422
    end
  end

  def destroy
    @customer = Customer.find_by(id: params[:id])
    if @customer
      @customer.destroy
      head :no_content
    else
      render json: {error: "Record not found"}, status: 400
    end
  end

  private

  def customer_params
    params.require(:customer).permit(:uid, :first_name, :last_name)
  end
end
