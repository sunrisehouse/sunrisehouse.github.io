import React, { useCallback, useEffect, useState } from 'react';

import Anchor from '../presentaitional/Anchor';

const isAnchorSelected = (anchorTop, scrollTop) =>{
    // 현재 스크롤된 위치에서 화면 중앙에 anchor top 이 왔을 경우
    return scrollTop + window.innerHeight/2 > anchorTop;
};

const filterAnchorDetails = anchors => {
    let last_depth = 0;
    anchors = [].slice.call(anchors).map(anchor => {
        let depth = parseInt(anchor.parentElement.nodeName[1]);
        if (last_depth !== 0 && depth > last_depth) depth = last_depth + 1;
        last_depth = depth
        return ({
            href: "#"+ anchor.parentElement.id,
            title: anchor.parentElement.innerText,
            depth: depth,
            top: anchor.getBoundingClientRect().top,
        });
    });
    return anchors;
}

export default () => {
    const [anchors, setAnchors] = useState([]);
    const [scrollTop, setScrollTop] = useState(null);

    const scrollHandler = useCallback(() => {
        const newScrollTop = window.scrollY || document.documentElement.scrollTop;
        setScrollTop(newScrollTop);
    }, []);

    const getAnchorItems = (anchorList) => {
        return anchorList.map((anchor) => {
            const { title, href, depth, top } = anchor;
            return (
                <Anchor title={title} href={href} depth={depth} isSelected={isAnchorSelected(top , scrollTop)}/>
            );
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
    }, []);

    useEffect(() => {
        const anchorElements = document.getElementsByClassName('markdown-header-auto-link');
        if (anchorElements) {
            setAnchors(filterAnchorDetails(anchorElements));
        }
    }, []);

    return (
        <div>
            {getAnchorItems(anchors)}
        </div>
    );
};
