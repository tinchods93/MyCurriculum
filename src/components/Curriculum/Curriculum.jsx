import React, { Component, Fragment } from 'react';
import { profile as Profile } from '../../profile.json';
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
    console.log(Profile);
  };

  spawnText = (key, title) => {
    const { profile } = this.state;
    // console.log(profile.about_you);
    console.log(key);
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
        <a href={profile.social_networks[social_network]}>
          <i className={`sn-icon fab fa-${social_network}`} />
        </a>
      ) : (
        <a href={profile.social_networks[social_network]}>
          <i className={`sn-icon fab fa-${social_network}-square`}></i>
        </a>
      );
    });
    return icons;
  };

  render() {
    const { profile } = this.state;
    return (
      <>
        {profile.city !== undefined ? (
          <div className='curriculum-card'>
            <div className='personal-data'>
              <div className='profile-title'>
                <span className='profile-name'>{profile.name}</span>
                <p>{profile.wanted_job}</p>
              </div>
              <div className='profile-text'>
                <p>{`${profile.city}, ${profile.country}.`}</p>
              </div>
              <div className='profile-text'>{this.spawnSocialNetworks()}</div>
            </div>
            <div className='experience-data'>
              {this.spawnText('about_you', 'ABOUT ME')}
              {this.spawnText('experience', 'EXPERIENCE')}
              {
                <Item
                  data={profile.education}
                  title={'EDUCATION'}
                  icon_class={profile.icon_classes.education}
                />
              }
              {
                <Item
                  data={profile.certificates}
                  title={'CERTIFICATES'}
                  icon_class={profile.icon_classes.certificates}
                />
              }
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
      return (
        <Fragment key={index}>
          <p className='desc-text'>
            <span className='exp-title'>{element[0]}</span>
            <span> </span>
            <span>{element[1]}</span>
          </p>
        </Fragment>
      );
    }),
  };

  return <Section data={_data} icon_class={icon_class} />;
};

const Section = ({ data, icon_class }) => {
  return (
    <div className='section'>
      <div className='section-title'>
        <p>
          <i class={`fas ${icon_class}`}></i>
          <span>{data.title}</span>
        </p>
      </div>
      <div className='section-body'>{data.body}</div>
    </div>
  );
};
