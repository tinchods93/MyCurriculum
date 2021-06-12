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
    this.setState({ language: ev.target.id });
  };

  spawnText = (key, title) => {
    const { profile, language } = this.state;
    const about = {
      title: title,
      body: profile[language][key].map((item, index) => {
        return (
          <Fragment key={index}>
            <span className='item__desc__text'>{item}</span>
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
    const personal_data_attributes =
      profile[language] !== undefined
        ? Object.keys(profile[language].personal_data)
        : [];
    return (
      <>
        {profile[language] !== undefined ? (
          <div className='curriculum__card'>
            <div className='curriculum__card__pdata'>
              <div className='curriculum__card__lang'>
                <button className='lang__btn' id='es' onClick={this.changeLang}>
                  ES
                </button>
                <button className='lang__btn' id='en' onClick={this.changeLang}>
                  EN
                </button>
              </div>
              <div className='pdata'>
                <div className='pdata__avatar'>
                  <div className='pdata__avatar__img'>
                    <img src={avatar} alt='avatar' />
                  </div>
                </div>
                <div className='pdata__title'>
                  <span>{profile[language].name}</span>
                  <p>{profile[language].wanted_job}</p>
                </div>
                <div className='pdata__text'>
                  {personal_data_attributes.map((attr, index) => {
                    return (
                      <Fragment key={index}>
                        <div className='__container'>
                          <div className='__attribute'>
                            <span>{capitalize(attr)}:</span>
                          </div>
                          <div className='__value'>
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
            </div>
            <div className='curriculum__card__edata'>
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
          <p className='item__desc__text'>
            <span className='edata__title'>{element.name}</span>
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
              <a href={element.URL} className='item__link'>
                [LINK]
              </a>
            ) : (
              <></>
            )}
          </p>
        </Fragment>
      ) : (
        <Fragment key={index}>
          <p className='item__desc__text'>
            <span className='edata__title'>{element.name}</span>
            <span> </span>
            <span className='edata_date'>{element.body}</span>
            {element.URL !== undefined && element.URL !== '#' ? (
              <a href={element.URL} className='item__link'>
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
            <i className='fas fa-circle skills__icon--filled ' key={index}></i>
          );
        } else {
          skillsLevel.push(
            <i className='fas fa-circle skills__icon' key={index}></i>
          );
        }
      }
      return (
        <Fragment key={index}>
          <div className='skills__container item__desc__text'>
            <div className='skill__title'>
              <span className='edata__title'>{key}:</span>
            </div>
            <div className='skill__level'>
              <span>{skillsLevel}</span>
            </div>
          </div>
        </Fragment>
      );
    }),
  };
  return (
    <div className='section'>
      <div className='section__title'>
        <p>
          <i className={`fas ${icon_class} __title-icon`}></i>
          <span>{_data.title}</span>
        </p>
      </div>
      <div className='section__body skills'>{_data.body}</div>
    </div>
  );
};

const Section = ({ data, icon_class }) => {
  return (
    <div className='section'>
      <div className='section__title'>
        <p>
          <i className={`fas ${icon_class} __title-icon`}></i>
          <span>{data.title}</span>
        </p>
      </div>
      <div className='section__body'>{data.body}</div>
    </div>
  );
};
