create table course
(
	id integer,
	name character varying,
	hours smallint	
)

select * from course;
insert into course values(1,'C',60);
insert into course values(2,'C++',100);
insert into course values(3,'Python',200);
insert into course values(4,'Core Java',100);
insert into course values(5,'Advanced Java',200);
insert into course values(6,'Android Developement',200);
insert into course values(7,'Node.js',100);
insert into course values(8,'Angular.js',120);



CREATE OR REPLACE FUNCTION public.fn_course_material(
    IN p_courseid character varying
)
  RETURNS TABLE(key text, data json) AS
$BODY$
DECLARE v_query text :='';
DECLARE outer_query text :='';
DECLARE v_table_name text :='';
BEGIN    
	--result base table
	v_table_name := 'course_material';

	outer_query ='SELECT '''|| v_table_name || '''::text as key,  array_to_json(array_agg(t)) as data FROM ( ';

	v_query = 'select course_material.id as course_material_id,course_material.book,course_material.author,course.id as courseid,course.name,course.hours 
	from course left outer join course_material on course.id = course_material.course where 1=1 ';

	if p_courseid != ''  then
		v_query = v_query ||  ' and course.id =' || p_courseid ;
	end if;

	outer_query = outer_query || v_query || ' )t;';

	RAISE NOTICE '%', outer_query;
RETURN QUERY
EXECUTE outer_query;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE;
