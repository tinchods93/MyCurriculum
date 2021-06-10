import React, { Component, Fragment } from 'react';
import { profile as Profile } from '../../profile.json';
import { capitalize } from '../../utils/stringUtils';
import avatar from '../../img/avatar.jpg';
import './Curriculum.css';

export default class Curriculum extends Component {
  constructor(props) {
    super(props);
    this.state = { language: 'es', profile: {} };
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = async () => {
    await this.setState({ profile: Profile });
  };
  changeLang = (ev) => {
    console.log('CLICK', ev.target.id);
    this.setState({ language: ev.target.id });
  };

  spawnText = (key, title) => {
    const { profile, language } = this.state;
    console.log(profile[language]);
    const about = {
      title: title,
      body: profile[language][key].map((item, index) => {
        return (
          <Fragment key={index}>
            <span className='desc-text'>{item}</span>
            <br />
          </Fragment>
        );
      }),
    };

    return (
      <Section data={about} icon_class={profile[language].icon_classes[key]} />
    );
  };

  spawnSocialNetworks = () => {
    const { profile, language } = this.state;
    console.log();
    const keys = Object.keys(profile[language].social_networks);
    const icons = keys.map((social_network, index) => {
      return social_network === 'linkedin' ? (
        <a href={profile[language].social_networks[social_network]} key={index}>
          <i className={`sn-icon fab fa-${social_network}`} />
        </a>
      ) : (
        <a href={profile[language].social_networks[social_network]} key={index}>
          <i className={`sn-icon fab fa-${social_network}-square`}></i>
        </a>
      );
    });
    return icons;
  };

  render() {
    const { language, profile } = this.state;
    console.log('ACTUALIZADO', profile[language]);
    const personal_data_attributes =
      profile[language] !== undefined
        ? Object.keys(profile[language].personal_data)
        : [];
    return (
      <>
        {profile[language] !== undefined ? (
          <div className='curriculum-card'>
            <div className='personal-data'>
              <div className='set_lang_btn'>
                <button className='langbtn' id='es' onClick={this.changeLang}>
                  ES
                </button>
                <button className='langbtn' id='en' onClick={this.changeLang}>
                  EN
                </button>
              </div>
              <div className='avatar-container'>
                <div className='avatar-img'>
                  <img src={avatar} alt='avatar' />
                </div>
              </div>
              <div className='profile-title'>
                <span className='profile-name'>{profile[language].name}</span>
                <p>{profile[language].wanted_job}</p>
              </div>
              <div className='profile-text'>
                {personal_data_attributes.map((attr, index) => {
                  return (
                    <Fragment key={index}>
                      <div className='personal-data-container'>
                        <div className='pdataAttribute'>
                          <span>{capitalize(attr)}:</span>
                        </div>
                        <div className='pdataValue'>
                          {attr !== 'email' &&
                          attr !== 'telefono' &&
                          attr !== 'linkedin' &&
                          attr !== 'github' &&
                          attr !== 'hackerRank' ? (
                            capitalize(profile[language].personal_data[attr])
                          ) : attr !== 'email' && attr !== 'telefono' ? (
                            <a href={profile[language].personal_data[attr]}>
                              {profile[language].personal_data[attr]}
                            </a>
                          ) : (
                            profile[language].personal_data[attr]
                          )}
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              <div className='social_media_icons'>
                {this.spawnSocialNetworks()}
              </div>
            </div>
            <div className='experience-data'>
              {this.spawnText(
                'about_you',
                language === 'es' ? 'ACERCA DE MI' : 'ABOUT ME'
              )}
              <Item
                data={profile[language].education}
                title={language === 'es' ? 'EDUCACIÓN' : 'EDUCATION'}
                icon_class={profile[language].icon_classes.education}
              />
              <Item
                data={profile[language].projects}
                title={language === 'es' ? 'PROJECTOS' : 'PROJECTS'}
                icon_class={profile[language].icon_classes.experience}
              />
              <Skills
                data={profile[language].skills}
                title={
                  language === 'es'
                    ? 'LENGUAJES DE PROGRAMACION Y TECNOLOGÍAS'
                    : 'PROGRAMMING LANGUAGES AND TECHNOLOGIES'
                }
                icon_class={profile[language].icon_classes.skills}
              />
              <Skills
                data={profile[language].languages}
                title={language === 'es' ? 'IDIOMAS' : 'LANGUAGES'}
                icon_class={profile[language].icon_classes.languages}
              />
              <Item
                data={profile[language].certificates}
                title={language === 'es' ? 'CERTIFICADOS' : 'CERTIFICATES'}
                icon_class={profile[language].icon_classes.certificates}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const Item = ({ data, title, icon_class }) => {
  const _data = {
    title: title,
    body: data.map((element, index) => {
      return title === 'PROJECTOS' ? (
        <Fragment key={index}>
          <p className='desc-text'>
            <span className='exp-title'>{element.name}</span>
            <span> </span>
            <span>
              {element.body.map((elem, index) => {
                return index !== element.body.length - 1 ? (
                  <Fragment key={index}>
                    {elem} <br />
                  </Fragment>
                ) : (
                  <Fragment key={index}>{elem}</Fragment>
                );
              })}
            </span>
            {element.URL !== undefined && element.URL !== '#' ? (
              <a href={element.URL} className='title_link'>
                [LINK]
              </a>
            ) : (
              <></>
            )}
          </p>
        </Fragment>
      ) : (
        <Fragment key={index}>
          <p className='desc-text'>
            <span className='exp-title'>{element.name}</span>
            <span> </span>
            <span>{element.body}</span>
            {element.URL !== undefined && element.URL !== '#' ? (
              <a href={element.URL} className='title_link'>
                [LINK]
              </a>
            ) : (
              <></>
            )}
          </p>
        </Fragment>
      );
    }),
  };

  return <Section data={_data} icon_class={icon_class} />;
};

const Skills = ({ data, title, icon_class }) => {
  const keys = Object.keys(data);
  const _data = {
    title: title,
    body: keys.map((key, index) => {
      const skillsLevel = [];
      for (let index = 0; index < 5; index++) {
        if (index < data[key]) {
          skillsLevel.push(
            <i className='fas fa-circle filled skills_icon' key={index}></i>
          );
        } else {
          skillsLevel.push(
            <i className='fas fa-circle skills_icon' key={index}></i>
          );
        }
      }
      return (
        <Fragment key={index}>
          <div className='skillsContainer desc-text'>
            <div className='skill-title'>
              <span className='exp-title'>{key}:</span>
            </div>
            <div className='skillLevel'>
              <span>{skillsLevel}</span>
            </div>
          </div>
        </Fragment>
      );
    }),
  };
  return (
    <div className='section'>
      <div className='section-title'>
        <p>
          <i className={`fas ${icon_class} title_icon`}></i>
          <span>{_data.title}</span>
        </p>
      </div>
      <div className='section-body skills'>{_data.body}</div>
    </div>
  );
};

const Section = ({ data, icon_class }) => {
  return (
    <div className='section'>
      <div className='section-title'>
        <p>
          <i className={`fas ${icon_class} title_icon`}></i>
          <span>{data.title}</span>
        </p>
      </div>
      <div className='section-body'>{data.body}</div>
    </div>
  );
};
