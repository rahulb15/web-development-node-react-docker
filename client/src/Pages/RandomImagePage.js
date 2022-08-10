import React from 'react'

var images = [
    'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3RhcnNpZXIyLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fSwidG9Gb3JtYXQiOiJhdmlmIn19',
    'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3RhcnNpZXIuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0=',
    'https://thumbs.dreamstime.com/b/vector-cartoon-small-mammal-bananas-tarsier-look-53413974.jpg',
    'https://us.123rf.com/450wm/goodstocker/goodstocker1803/goodstocker180300162/103535004-sticker-for-messenger-with-funny-animal-dreamy-pensive-hamster-vector-illustration-isolated-on-white.jpg?ver=6',
    'https://cdn.pixabay.com/photo/2020/07/26/04/18/primate-5438369__340.png',
    'https://img.freepik.com/premium-vector/tarsier-tree-night_1308-14238.jpg?w=2000',

]

var randoms = images[Math.floor(Math.random() * images.length)];
console.log(randoms);
    const RandomImagePage= () => {
        return (
          <div>
            <section className="welcome" align="center">
              <div className="container mt-5">
                <div className="row">
                  <div className="col-md-12">
                    <div className="welcome-content">
                      <div className="welcome-form">
                        <h1 className="form-title" width="100%"><span className="text-primary">Lets's Code</span></h1>
                        <img src={randoms} alalt="Avatar" className="avatar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
        )

      }

    export default RandomImagePage;