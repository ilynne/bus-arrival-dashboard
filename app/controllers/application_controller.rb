class ApplicationController < ActionController::API
  def frontend_index_html
    render 'public/index.html'
  end
end
