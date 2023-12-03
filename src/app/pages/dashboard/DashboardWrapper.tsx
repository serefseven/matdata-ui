import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import clsx from "clsx";
import {getAccountApplications, processApp} from "../mat-data/core/_requests";
import {useEffect, useState} from "react";
import {IApplicationDtoApiResponse} from "../mat-data/core/_models";
import download from 'js-file-download';

const API_URL = process.env.REACT_APP_SECURITY_SERVICE_API_URL;
export const FILE_URL = `${API_URL}/file/load/`;
const DashboardPage = () => {
    const intl = useIntl()
    const [apps, setApps] = useState<IApplicationDtoApiResponse[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<{id:number,file:any}[]>([]);



    useEffect(() => {
        getAccountApplications().then(r => setApps(r.data));
    }, []);

    const setFile = (e, id:number) => {
        const selectedFile = e.target.files[0];

        if(selectedFile==null){
            setSelectedFiles([...selectedFiles.filter(f => f.id!=id)]);
            return;
        }

        setSelectedFiles([...selectedFiles.filter(f => f.id!=id),{id:id,file:selectedFile}])
    }

    const openChooseFile = (id) => {

        const input = document.querySelector('#fileUpload_'+id) //getElementById('fileUpload_'+id).click()
        if(input!=null){
            // @ts-ignore
            input.click()
        }
    }

    const process = (id) => {
        const app = selectedFiles.find(f => f.id==id);
        if(app ==null)
            return;

        processApp(app.file, id).then(r => {
            console.log(r.headers);
            console.log(r.headers['x-file-name']);
            download(r.data, r.headers['x-file-name']);
        })
    }

    return (
        <>
            <div className='row g-5 g-xl-8 justify-content-center'>

                {apps.map(a =>
                        <div key={a.id} className="col-xxl-6">

                            <div className="card card-flush h-md-100">
                                <div className="card-body py-9">
                                    <div className="row gx-9 h-100">
                                        <div className="col-sm-6 mb-10 mb-sm-0" style={{height:'336px'}}>
                                            <div
                                                className="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-400px min-h-sm-100 h-100"
                                                style={{
                                                    backgroundSize: '100% 100%',
                                                    backgroundImage: 'url(/media/stock/600x600/img-12.jpg)'
                                                }}>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="d-flex flex-column h-100">
                                                <div className="mb-2">
                                                    <div className="d-flex flex-stack mb-6">
                                                        <div className="flex-shrink-0 me-5">
                                                            <span
                                                                className="text-gray-500 fs-7 fw-bold me-2 d-block lh-1 pb-1">{a.acceptedExtensions}</span>
                                                            <span className="text-gray-800 fs-1 fw-bold">{a.name}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-2">
                                                    <span
                                                        className="fw-semibold text-gray-600 fs-6 mb-8 d-block">{a.description}</span>
                                                </div>

                                                <div className="d-flex flex-column mt-auto bd-highlight">
                                                    {a.templateId!=undefined?
                                                    <a href={FILE_URL+a.templateId}
                                                        className="btn btn-light-warning" target="_blank">
                                                        <i className="bi bi-upload fs-4 me-2"></i>
                                                        {intl.formatMessage({id: 'DASHBOARD.DOWNLOAD_TEMPLATE'})}
                                                    </a>
                                                        : null}
                                                    <button className="btn btn-light-success mt-2"
                                                            onClick={()=>openChooseFile(a.id)}>
                                                        <i className="bi bi-upload fs-4 me-2"></i>
                                                        {intl.formatMessage({id: 'DASHBOARD.BUTTON_CHOOSE_FILE'})}
                                                    </button>
                                                    <input className="form-control"
                                                           type="file"
                                                           id={"fileUpload_"+a.id}
                                                           onChange={(e) => setFile(e,a.id)}
                                                           style={{display:'none'}}
                                                           accept={a.acceptedExtensions}/>
                                                    <button
                                                        disabled={!selectedFiles.find(f => f.id==a.id)}
                                                        onClick={() => process(a.id)}
                                                        className="btn btn-light-primary mt-2">
                                                        <i className="bi bi-download fs-4 me-2"></i>
                                                        {intl.formatMessage({id: 'DASHBOARD.BUTTON_PROCESS'})}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                )}

            </div>

        </>
    );
}

const DashboardWrapper = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {
    DashboardWrapper
}
