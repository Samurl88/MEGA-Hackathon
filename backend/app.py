from flask import Flask, request
import redditapi

api = Flask(__name__)


@api.route('/profile')
def my_profile():
    
    response_body = {
        "name": "Teddy",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return redditapi.getPosts()


# @api.route('/login')
# def my_profile():
#     username = request.args.get('username')
#     password = request.args.get('password')

    

#     return redditapi.getPosts()
