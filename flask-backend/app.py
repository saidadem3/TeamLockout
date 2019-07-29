from flask import Flask
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask import request, redirect, url_for, render_template

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:chill94@localhost/lockout'

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

@app.route("/")
def my_index():
    return ("Update")

if __name__ == "__main__":
    app.run(debug=True)