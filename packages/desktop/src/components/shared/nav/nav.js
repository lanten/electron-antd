import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Input, Tooltip, Icon, Avatar, Button } from 'antd';
import { setSearchText } from '../../../redux/actions/actionCreators/search';
import { hashDomainUrl } from '../../../shared/helpers/domain';
import { getWalletProvider } from '../../../shared/helpers/provider';
import { generateWallet } from '../../../shared/helpers/user';

const Nav = () => {
  const [url, setUrl] = useState("")
  const logoLink = 'https://avatars1.githubusercontent.com/u/19377315?s=400&v=4';
  const dispatch = useDispatch();

  // have the url ready if the browser needs it :)
  const handleChange = (e) => {
    if (e.key === 'Enter') {
        dispatch(setSearchText(url))
        return;
    }
    setUrl(e.target.value)
    const hash = hashDomainUrl(url);
    const provider = getWalletProvider();
    const wallet = generateWallet(provider);
  }

  return (
    <div className="sticky-header flex">
        <div className="left">
            <Avatar size={64} src={`${logoLink}`} />
        </div>
        <div className="mid">
        <Input
        value={url}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleChange(e)}
        placeholder="Search or type a URL"
        prefix={
            <svg xmlns="http://www.w3.org/2000/svg" width="13.299" height="11.496" viewBox="0 0 23.299 21.496">
            <g id="Group_28" data-name="Group 28" transform="translate(0.707 0)">
                <g id="Ellipse_17" data-name="Ellipse 17" transform="translate(6.601)" fill="none" stroke="#000" strokeWidth="2">
                <circle cx="7.995" cy="7.995" r="7.995" stroke="none"/>
                <circle cx="7.995" cy="7.995" r="6.995" fill="none"/>
                </g>
                <path id="Path_53" data-name="Path 53" d="M1806.381,2219.2l-8.636,8.636" transform="translate(-1797.744 -2207.047)" fill="none" stroke="#000" strokeWidth="2"/>
            </g>
            </svg>
        }
        />
        </div>
        <div className="right">
            <div className="navbtns">
            <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="18.912" height="16" viewBox="0 0 26.434 25">
                <g id="Group_32" data-name="Group 32" transform="translate(-540 -208)">
                    <path id="Path_58" data-name="Path 58" d="M562.036,214.07A11.5,11.5,0,1,1,552.5,209" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2"/>
                    <path id="Path_59" data-name="Path 59" d="M562.036,214.07" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2"/>
                    <path id="Path_60" data-name="Path 60" d="M552.5,209" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2"/>
                    <path id="Path_61" data-name="Path 61" d="M557.546,217.66l8.889-5.534-7.766-1.806Z"/>
                </g>
                </svg>
            </Button>
            <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="11.255" height="16.781" viewBox="0 0 19.255 25.281">
                <path id="Path_54" data-name="Path 54" d="M3484.064,1455.915h17.255v22.18l-8.564-6.955-8.691,6.955Z" transform="translate(-3483.064 -1454.915)" fill="none" stroke="#000" strokeWidth="2"/>
            </svg>
            </Button>
            </div>
        </div>
    </div>
  )
}

export default Nav;
