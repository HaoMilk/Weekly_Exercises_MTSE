import './App.css';

function App() {
  return (
    <div className='profile-container'>
      <h1>Hồ sơ cá nhân</h1>
      <div className='profile-card'>
        <p>
          <strong>Họ và tên:</strong> Nguyễn Ngọc Kín Hào
        </p>
        <p>
          <strong>MSSV:</strong> 22110314
        </p>
        <p>
          <strong>GitHub:</strong>{' '}
          <a
            href='https://github.com/haonguyen'
            target='_blank'
            rel='noopener noreferrer'
          >
            https://github.com/HaoMilk/Weekly_Exercises_MTSE.git
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
