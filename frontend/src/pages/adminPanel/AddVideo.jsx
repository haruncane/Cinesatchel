import { useContext, useState } from 'react';
import SideBar from '../../components/sideBar/SideBar';
import "./addVideo.scss";
import Select from "react-select";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";
import { addVideo } from '../../context/videoContext/apiCalls';
import { VideoContext } from "../../context/videoContext/VideoContext";


const AddVideo = () => {
  const storage = getStorage(app);
  const { dispatch } = useContext(VideoContext);

  const formatOptions = [
    { value: 'Movie', label: 'Movie' },
    { value: 'Series', label: 'Series' }
  ];
  const categoryOptions = [
    { value: 'Action', label: 'Action' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Sci_Fi', label: 'Sci-Fi' },
    { value: 'Thriller', label: 'Thriller' }
  ];

  const [newVideo, setNewVideo] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewVideo({ ...newVideo, [e.target.name]: value });
  };

  const handleFormatChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setNewVideo({ ...newVideo, "format": selectedValue });
  };

  const handleCategoriesChange =  (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setNewVideo({ ...newVideo, "categories": values })
  };

  const upload = (contents) => {
    contents.forEach(content => {
      const storageRef = ref(storage, '/contents/' + content.file.name)
      const uploadTask = uploadBytesResumable(storageRef, content.file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (err) => {console.log(err)}, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setNewVideo((item) => {
            return { ...item, [content.label]: url };
          });
          setUploaded((item) => item + 1);
        });
      });
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: video, label: "video" },
      { file: thumbnail, label: "thumbnail" },
      { file: trailer, label: "trailer" }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo(newVideo, dispatch);
  };

  console.log(newVideo);

  return (
    <div className="addVideo">
      <div className="left">
        <SideBar />
      </div>
      <div className="right">
        <form className='videoInfoInputs'>
          <label>Video Name</label>
          <input type="text" name="videoname" onChange={handleChange}></input>
          <label>Format</label>
          <Select
            className='formatSelect'
            name="format"
            isMulti={false}
            options={formatOptions}
            onChange={handleFormatChange}
          />
          <label>Categories</label>
          <Select 
            className='categorySelect'
            name="categories"
            isMulti={true}
            options={categoryOptions}
            isClearable={false}
            onChange={handleCategoriesChange}
          />
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange}></input>
          <label>Cast</label>
          <input type="text" name="cast" onChange={handleChange}></input>
          <label>Director(s)</label>
          <input type="text" name="director" onChange={handleChange}></input>
          <label>Release Date</label>
          <input type="text" name="releasedate" onChange={handleChange}></input>
          <label>Duration</label>
          <input type="text" name="duration" onChange={handleChange}></input>
          <label>Limits</label>
          <input type="text" name="limits" onChange={handleChange}></input>
          <label>Series Name</label>
          <input type="text" name="seriesname" onChange={handleChange}></input>
          <label>Chapter Number</label>
          <input type="text" name="chapternumber" onChange={handleChange}></input>
          <label>Video</label>
          <input type="file" id="video" name="video" onChange={e=>setVideo(e.target.files[0])}></input>
          <label>Thumbnail</label>
          <input type="file" id="thumbnail" name="thumbnail" onChange={e=>setThumbnail(e.target.files[0])}></input>
          <label>Trailer</label>
          <input type="file" id="trailer" name="trailer" onChange={e=>setTrailer(e.target.files[0])}></input>
        </form>
        <div className="buttons">
          {uploaded === 3 ? (
            <button className='addVideoBtn' onClick={handleSubmit}>Add Video</button>
          ) : ( thumbnail === null && trailer === null && video === null ? (
            <button className='addVideoBtn' onClick={handleUpload} disabled style={{ color: "grey" }}>Upload Video</button>
          ) : (
            <button className='addVideoBtn' onClick={handleUpload}>Upload Video</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddVideo;