import React, { Component, Fragment } from 'react';
import { profile as Profile } from '../../profile.json';
import { capitalize } from '../../utils/stringUtils';
import avatar from '../../img/avatar.jpg';
import './Curriculum.css';

export default class Curriculum extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = () => {
    this.setState({ profile: Profile });
  };

  spawnText = (key, title) => {
    const { profile } = this.state;
    const about = {
      title: title,
      body: profile[key].map((item, index) => {
        return (
          <Fragment key={index}>
            <span className='desc-text'>{item}</span>
            <br />
          </Fragment>
        );
      }),
    };

    return <Section data={about} icon_class={profile.icon_classes[key]} />;
  };

  spawnSocialNetworks = () => {
    const { profile } = this.state;
    console.log();
    const keys = Object.keys(profile.social_networks);
    const icons = keys.map((social_network, index) => {
      return social_network === 'linkedin' ? (
        <a href={profile.social_networks[social_network]} key={index}>
          <i className={`sn-icon fab fa-${social_network}`} />
        </a>
      ) : (
        <a href={profile.social_networks[social_network]} key={index}>
          <i className={`sn-icon fab fa-${social_network}-square`}></i>
        </a>
      );
    });
    return icons;
  };

  render() {
    const { profile } = this.state;

    const personal_data_attributes =
      profile.personal_data !== undefined
        ? Object.keys(profile.personal_data)
        : [];
    return (
      <>
        {profile.personal_data !== undefined ? (
          <div className='curriculum-card'>
            <div className='personal-data'>
              <div className='avatar-container'>
                <div className='avatar-img'>
                  <img src={avatar} alt='avatar' />
                </div>
              </div>
              <div className='profile-title'>
                <span className='profile-name'>{profile.name}</span>
                <p>{profile.wanted_job}</p>
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
                            capitalize(profile.personal_data[attr])
                          ) : attr !== 'email' && attr !== 'telefono' ? (
                            <a href={profile.personal_data[attr]}>
                              {profile.personal_data[attr]}
                            </a>
                          ) : (
                            profile.personal_data[attr]
                          )}
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              <div className='profile-text'>{this.spawnSocialNetworks()}</div>
            </div>
            <div className='experience-data'>
              {this.spawnText('about_you', 'ACERCA DE MI')}
              <Item
                data={profile.education}
                title={'EDUCACIÓN'}
                icon_class={profile.icon_classes.education}
              />
              <Item
                data={profile.projects}
                title={'PROJECTOS'}
                icon_class={profile.icon_classes.experience}
              />
              <Skills
                data={profile.skills}
                title={'HABILIDADES'}
                icon_class={profile.icon_classes.skills}
              />
              <Skills
                data={profile.languages}
                title={'LENGUAJES'}
                icon_class={profile.icon_classes.languages}
              />
              <Item
                data={profile.certificates}
                title={'CERTIFICADOS'}
                icon_class={profile.icon_classes.certificates}
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
            <i className='fas fa-circle filled' key={index}></i>
          );
        } else {
          skillsLevel.push(<i className='fas fa-circle' key={index}></i>);
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
          <i className={`fas ${icon_class}`}></i>
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
          <i className={`fas ${icon_class}`}></i>
          <span>{data.title}</span>
        </p>
      </div>
      <div className='section-body'>{data.body}</div>
    </div>
  );
};
