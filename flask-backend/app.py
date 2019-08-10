from flask import Flask
from flask_cors import CORS, cross_origin
from datetime import timedelta
import psycopg2
import uuid
import socket
from flask_sqlalchemy import SQLAlchemy
from flask import Response, make_response, current_app
from flask import request, redirect, url_for, render_template, jsonify
from functools import update_wrapper
#from werkzeug.security import generate_password_hash, check_password_hash


hostname = socket.gethostname()
ipaddress = socket.gethostbyname(hostname)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:chill94@localhost/lockout'
app.config['SECRET_KEY'] = 'af4e8a846e861702dd7e82b3083a0032'

db = SQLAlchemy(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class users(db.Model):



    user_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    admin = db.Column(db.Boolean)
    trainer = db.Column(db.Boolean)
    pin = db.Column(db.Integer, nullable=False, unique=True)
    ddprinters = db.Column(db.Boolean)
    powertools = db.Column(db.Boolean)

    def __init__(self, user_id, fname, lname, email, admin, trainer, pin, ddprinters, powertools):
        self.user_id = user_id
        self.fname = fname
        self.lname = lname
        self.email = email
        self.admin = admin
        self.trainer = trainer
        self.pin = pin
        self.ddprinters = ddprinters
        self.powertools = powertools

    def __repr__(self):
        return '<User %r>' % self.username

class section(db.Model):
    section_id = db.Column(db.Integer, primary_key=True)
    section_name = db.Column(db.String(50), nullable=False)

class machine(db.Model):
    machine_id = db.Column(db.Integer, primary_key=True)
    machine_name = db.Column(db.String(50), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.section_id'), nullable=False)

# class permissions(db.Model):
#     permission_id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
#     section_id = db.Column(db.Integer, db.ForeignKey('section.section_id'), nullable=False)

@app.route('/')
def home():
    return '''<h1>We Are Team Lockout</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

@app.route('/user', methods=['GET'])
def get_all_users():

    all_users = users.query.all()

    output = []

    for user in all_users:
        user_data = {}
        user_data['user_id'] = user.user_id
        user_data['fname'] = user.fname
        user_data['lname'] = user.lname
        user_data['email'] = user.email
        user_data['admin'] = user.admin
        user_data['trainer'] = user.trainer
        user_data['pin'] = user.pin
        user_data['ddprinters'] = user.ddprinters
        user_data['powertools'] = user.powertools

        output.append(user_data)

    return jsonify({'all_users' : output})

@app.route('/user/<user_id>', methods=['GET'])
def get_one_user(user_id):

    user = users.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})
    
    user_data = {}
    user_data['user_id'] = user.user_id
    user_data['fname'] = user.fname
    user_data['lname'] = user.lname
    user_data['email'] = user.email
    user_data['admin'] = user.admin
    user_data['trainer'] = user.trainer
    user_data['ddprinters'] = user.ddprinters
    user_data['powertools'] = user.powertools

    temp = ''
    for key in user_data:
        temp = temp + " " + str(user_data[key])
    temp = user_data['lname'] +","+user_data['fname'] +" "+"powertools,3dprinters"+" "+str(user_data['pin'])
    # return jsonify({'user' : user_data})
    return temp

@app.route('/validate/<user_id>', methods=['GET'])
def validate_user(user_id):
    found = True

    user = users.query.filter_by(user_id=user_id).first()
    user_data = {}

    if not user:
        return jsonify({'message' : 'No user found!'})
    
    user_data['user_id'] = user.user_id
    user_data['fname'] = user.fname
    user_data['lname'] = user.lname
    user_data['email'] = user.email
    user_data['admin'] = user.admin
    user_data['trainer'] = user.trainer
    user_data['pin'] = user.pin
    user_data['ddprinters'] = user.ddprinters
    user_data['powertools'] = user.powertools


    return jsonify({'user': user_data})


@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()

    #hashed_password = generate_password_hash(data['password'], method='sha256')
    
    new_user = users(user_id=data['user_id'], fname=data['fname'], lname=data['lname'], email=data['email'] , admin=False, trainer=False, pin=data['pin'], ddprinters = False, powertools = False)
    db.session.add(new_user)
    db.session.commit()
    return 'hello world'
  #  return jsonify({'message' : 'New user created!'})

@app.route('/user/<user_id>', methods=['PUT'])
def promote_user(user_id):
    return ''

    

@app.route('/user', methods=['DELETE'])
def delete_user():
    return ''

@app.route('/redirect')
def check():
    return redirect("https://localhost:3000")

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)