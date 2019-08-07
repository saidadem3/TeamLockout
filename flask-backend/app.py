from flask import Flask
import psycopg2
import uuid
from flask_sqlalchemy import SQLAlchemy
from flask import request, redirect, url_for, render_template, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:chill94@localhost/lockout'
app.config['SECRET_KEY'] = 'af4e8a846e861702dd7e82b3083a0032'

db = SQLAlchemy(app)

class users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    admin = db.Column(db.Boolean)
    trainer = db.Column(db.Boolean)
    pin = db.Column(db.Integer, nullable=False, unique=True)

    def __init__(self, user_id, fname, lname, email, admin, trainer, pin):
        self.user_id = user_id
        self.fname = fname
        self.lname = lname
        self.email = email
        self.admin = admin
        self.trainer = trainer
        self.pin = pin

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
        output.append(user_data)

    return jsonify({'all_users' : output})

@app.route('/user/<user_id>', methods=['GET'])
def get_one_user(user_id):

    user = users.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})
    
    user_data = {}
    user_data['user_id'] = users.user_id
    user_data['fname'] = users.fname
    user_data['lname'] = users.lname
    user_data['email'] = users.email
    user_data['admin'] = users.admin
    user_data['trainer'] = users.trainer
    user_data['pin'] = users.pin

    return jsonify({'user' : user_data})

@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')
    
    new_user = users(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message' : 'New user created!'})

@app.route('/user/<user_id>', methods=['PUT'])
def promote_user(user_id):
    return ''

@app.route('/user', methods=['DELETE'])
def delete_user():
    return ''

if __name__ == "__main__":
    app.run(debug=True)