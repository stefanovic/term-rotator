import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const  ReactTermRotator = () => {
  const termSets = [
    [
      { term: 'Api-first', color: 'darkmagenta', link: 'https://webstack.livedata.it/api/', description: 'Approccio di sviluppo in cui le API...' },
      { term: 'RESTful APIs', color: 'navy', link: 'https://en.wikipedia.org/wiki/REST', description: 'Approccio di sviluppo in cui le API...' },
      { term: 'GraphQL', color: 'crimson', link: 'https://webstack.livedata.it/api/graphql/', description: 'Approccio di sviluppo in cui le API...' },
    ],
    [
      { term: 'Jamstack', color: 'darkslategrey', link: 'https://jamstack.org/', description: 'Approccio di sviluppo in cui le API...' },
      { term: 'Serverless', color: 'olive', link: 'https://www.netlify.com/blog/intro-to-serverless-functions/', description: 'Approccio di sviluppo in cui le API...' },
      { term: 'Static Site Generation', color: 'darkorange', link: 'https://webstack.livedata.it/blog/astro-build/', description: 'Approccio di sviluppo in cui le API...' },
    ],
    [
      { term: 'JavaScript', color: 'darkred', link: 'https://developer.mozilla.org/en-US/docs/Web/javascript', description: 'Approccio di sviluppo in cui le API...' },
      { term: 'TypeScript', color: 'darkslateblue', link: 'https://www.typescriptlang.org', description: 'Approccio di sviluppo in cui le API...' },
      { term: 'React', color: 'dimgrey', link: 'https://it.legacy.reactjs.org', description: 'Approccio di sviluppo in cui le API...' },
    ],
  ];

  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [selectedSet, setSelectedSet] = useState(0);
  const [paused, setPaused] = useState(false);

  const boxRef = useRef(null);

  const animatedStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
    reset: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrentTermIndex(prevIndex => (prevIndex + 1) % termSets[selectedSet].length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedSet, termSets, paused]);

  const handleBoxClick = () => {
    setPaused(prevPaused => !prevPaused);
  };

  const handleSetChange = (index) => {
    setSelectedSet(index);
    setCurrentTermIndex(0);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <div className="d-flex mb-3">
            {termSets.map((set, index) => (
              <button
                key={index}
                className={`btn btn-${index === selectedSet ? 'primary' : 'secondary'} me-2`}
                onClick={() => handleSetChange(index)}
                style={{ color: index === selectedSet ? 'red' : '#0658d0' }}
              >
                {index === 0 ? 'API-first' : index === 1 ? 'Jamstack' : 'Javascript'}
              </button>
            ))}
          </div>
          <div className="card shadow-sm rounded-lg border border-gray-300 p-4 text-white " style={{ backgroundColor: termSets[selectedSet][currentTermIndex].color }}>
            <div className="card-body">

            <img src="https://webstack.livedata.it/react.png" alt="React Logo" className="w-16 h-auto mx-auto mt-4" />
<br></br>
              <animated.p ref={boxRef} style={animatedStyle} onClick={handleBoxClick}>
                <a href={termSets[selectedSet][currentTermIndex].link} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {termSets[selectedSet][currentTermIndex].term}
                </a>
                <br />
                {termSets[selectedSet][currentTermIndex].description}
              </animated.p>
              <br></br>
            </div>
          </div>
          <br />
          <button className="btn btn-warning me-2" onClick={handleBoxClick}>
            {paused ? 'Riprendi' : 'Pausa'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactTermRotator;
