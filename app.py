from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///skill_swap.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

class SkillSwap(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teacher_name = db.Column(db.String(150), nullable=False)
    teaching_skill = db.Column(db.String(150), nullable=False)
    learning_skill = db.Column(db.String(150), nullable=False)
    avatar_url = db.Column(db.String(500), nullable=False)

# Routes
@app.route('/')
def index():
    swaps = SkillSwap.query.all()
    user_name = session.get('user_name')
    return render_template('index.html', swaps=swaps, user_name=user_name)

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    if User.query.filter_by(email=email).first():
        flash('Email already registered. Please log in.')
        return redirect(url_for('index'))
    password_hash = generate_password_hash(password)
    new_user = User(name=name, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()
    session['user_name'] = name
    flash('Account created and logged in successfully!')
    return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        session['user_name'] = user.name
        flash('Logged in successfully!')
        return redirect(url_for('index'))
    flash('Invalid email or password.')
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('user_name', None)
    flash('You are logged out.')
    return redirect(url_for('index'))

@app.route('/join-swap/<int:swap_id>', methods=['POST'])
def join_swap(swap_id):
    if 'user_name' not in session:
        return jsonify({'error': 'Login required to join a swap.'}), 401
    swap = SkillSwap.query.get_or_404(swap_id)
    # Logic for joining swap (e.g., storing join info) can be added here.
    return jsonify({'message': f'You joined {swap.teacher_name}\'s swap!'}), 200

# Command to initialize database and add sample swaps
@app.cli.command('initdb')
def initdb():
    db.drop_all()
    db.create_all()
    swaps = [
        SkillSwap(teacher_name='Arun Chatterjee', teaching_skill='Python Programming', learning_skill='Photography', avatar_url='https://randomuser.me/api/portraits/men/23.jpg'),
        SkillSwap(teacher_name='Priya Sharma', teaching_skill='Baking', learning_skill='Spanish', avatar_url='https://randomuser.me/api/portraits/women/92.jpg'),
        SkillSwap(teacher_name='Tom Becker', teaching_skill='Guitar', learning_skill='Web Dev', avatar_url='https://randomuser.me/api/portraits/men/43.jpg'),
        SkillSwap(teacher_name='Marie Durand', teaching_skill='French', learning_skill='Yoga', avatar_url='https://randomuser.me/api/portraits/women/77.jpg'),
    ]
    db.session.bulk_save_objects(swaps)
    db.session.commit()
    print("Database initialized with sample swaps.")

if __name__ == '__main__':
    app.run(debug=True)
