import { Link } from "react-router-dom";
import { IconDelete, IconEdit } from "../assets/icons/page";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img"
        />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="img"
          />
          <div className="info">
            <span>Kartono</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit/2`}>
              <img src={IconEdit} alt="icon-edit" />
            </Link>
            <img src={IconDelete} alt="icon-delete" />
          </div>
        </div>

        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          veniam?
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit, non sed quaerat facilis voluptatibus rerum eveniet unde
          expedita ipsum minima error ad saepe eius nobis illo dignissimos! Ex
          odit, non quam asperiores iusto aperiam esse dicta aliquid
          reprehenderit rem blanditiis beatae repellendus velit. Fugit
          dignissimos quo dolores laudantium similique nostrum consequuntur
          explicabo, libero optio dolor dolorum voluptatum vitae iste tempore
          iure nobis officia minus sed exercitationem quos. Voluptate corporis
          aperiam quidem dolor doloribus. Modi assumenda eveniet repudiandae
          quas, doloribus nostrum repellat tenetur consequatur est perspiciatis
          iusto nobis perferendis consequuntur deleniti fugit illo minima,
          facere magni ipsam similique, aperiam quidem inventore.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          enim veniam reprehenderit, accusantium itaque, nobis officia a rerum
          asperiores eum numquam suscipit harum excepturi ipsa eaque iste esse
          rem officiis fuga. Fugiat eos laboriosam dignissimos quo iste, omnis
          soluta quod quibusdam itaque iusto hic quis dolorem sapiente magnam
          distinctio nostrum dolores. Repellat dignissimos voluptatibus cumque,
          ad praesentium totam quia fuga inventore eaque mollitia nostrum
          possimus ut. Aperiam vero eius quidem quas eos eaque cupiditate magni,
          laudantium sed deleniti, alias delectus voluptates! Ullam earum sint
          explicabo sapiente, ut quod neque reprehenderit magnam illum, aliquam
          commodi necessitatibus quia nobis similique? Tempora, error.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          in optio impedit veritatis praesentium quae, quibusdam natus
          accusantium ut fugit vitae rerum fuga. Iure laudantium explicabo,
          beatae sint tempore temporibus necessitatibus debitis nostrum aperiam
          tenetur ullam architecto possimus at, nisi minima delectus nulla iste,
          dolores inventore magnam facilis dicta natus illum! Hic quia
          reiciendis ipsam qui nihil, perspiciatis placeat aliquid, laboriosam
          ab commodi voluptas vel repudiandae in explicabo ullam at illum
          perferendis, voluptatem provident magni maiores tempore eius nisi?
          Inventore aperiam molestiae modi, ea repellat sequi labore, quos quis
          sed distinctio suscipit blanditiis hic magnam provident vitae debitis
          non error ut numquam cumque? Deserunt vitae amet perferendis fugit
          optio. Consequatur temporibus sunt nihil quod repellendus
          necessitatibus vitae asperiores adipisci eligendi facilis sed deleniti
          rem quas molestiae rerum ab deserunt laudantium eum, quaerat, porro
          labore! Eveniet, repellendus enim nihil quasi quae eligendi, illo
          ullam dolorum error fugiat sunt facere! Omnis, ex!
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
