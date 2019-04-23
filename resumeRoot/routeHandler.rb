require 'sinatra'
require 'sinatra/reloader' if development?


get '/' do
    erb :index
end

get '/about' do
    erb :about
end
get '/contact' do
    erb :contact
end
get '/education' do
    erb :education
end
get '/work' do
    erb :work
end